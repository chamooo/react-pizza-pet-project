import React, {useCallback, useContext, useRef, useState} from 'react';
import { SearchContext } from "../../App";
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/Md';


const Search = () => {
    const [value, setValue] = useState();
    const {searchValue, setSearchValue} = useContext(SearchContext);
    const inputRef = useRef();

    const onClickClear = () => {
        setSearchValue('')
        setValue('');
        inputRef.current.focus();
    }

    const updateSearchValue = useCallback(debounce(str => setSearchValue(str), 500), [])

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    };


    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChangeInput(e)}
                className={styles.input}
                type="text"
                placeholder="Знайди свою піцу"
            />
            <BsSearch className={styles.btn} />
            {searchValue && <MdClear onClick={onClickClear} className={styles.clear} />}
        </div>
    );
};

export default Search;
