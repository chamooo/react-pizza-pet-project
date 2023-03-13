import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {list} from "../components/Sort";
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = ({searchValue}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort);
    const currentPage = useSelector(state => state.filter.currentPage);

    const onChangeCategory = (id) => dispatch(setCategoryId(id));
    const onChangePage = number => dispatch(setCurrentPage(number))


    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPizzas = () => {
        const url = `https://63fb43527a045e192b65f0fd.mockapi.io/items?` +
            `page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}` +
            `&sortBy=${sortType.property}&order=${sortType.order}${searchValue.length ? `&search=${searchValue}` : ''}`;
        setIsLoading(true);
        axios.get(url)
            .then(res => setItems(res.data))
            .catch((err) => alert('Error when fetching data'))
            .finally(() => setIsLoading(false))

        if (isMounted.current) {
            const queryString = qs.stringify({
                property: sortType.property,
                order: sortType.order,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;

    }

    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.property === params.property);
            dispatch(
                setFilters({...params, sort})
            )
            isSearch.current = true;
        }
    }, [])

    useEffect(() => {
        if(!isSearch.current) {
            fetchPizzas();
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
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination pageNumber={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;
