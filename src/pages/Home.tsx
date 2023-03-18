import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
    // Redux
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // беремо комірки з редакса, а потім через dispatch зберігаємо в них дані
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort);
    const currentPage = useSelector((state) => state.filter.currentPage);
    const { items, status } = useSelector((state) => state.pizza);

    console.log(items);

    const onChangeCategory = (id) => dispatch(setCategoryId(id));
    const onChangePage = (number) => dispatch(setCurrentPage(number));

    // Local state

    const isSearch = useRef(false);
    const isFirstRender = useRef(true);

    const getPizzas = async () => {
        dispatch(fetchPizzas({ currentPage, categoryId, sortType, searchValue }));
    };

    useEffect(() => {
        if (!isFirstRender.current) {
            const queryString = qs.stringify({
                property: sortType.property,
                order: sortType.order,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isFirstRender.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);

    // якщо був перший рендер, то перевіряємо URL параметри та зберігаємо їх в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.property === params.property);
            dispatch(setFilters({ ...params, sort }));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);

    window.scrollTo(0, 0);

    const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={(id: number) => onChangeCategory(id)}
                />
                <Sort />
            </div>

            <h2 className="content__title">Всі піци</h2>
            {status === 'error' ? (
                <div className="cart cart--empty">
                    <h2>От халепа! </h2>
                    <p>
                        Перепрошуємо, сталася помилка. <br /> Спробуйте перезавантажити сторінку 😕
                    </p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination pageNumber={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
