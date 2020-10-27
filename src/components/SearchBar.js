import React from 'react';
import styled from 'styled-components';
import { InputSearch } from './InputSearch';


const Search = styled.div`
    border-bottom: 1px solid #BDBDBD;
    height: 30px;
    display: flex;
    box-sizing: border-box;
    margin: 10px 10px 20px 10px;
    align-items: center;

    img{
        width: 20px;
        height: 20px;
        margin-left: 20px;
    
    }

    input {
        height: 27px;
        text-align: center;
        font-size: 24px
    }

`

export const SearchBar = (props) => {

    const handleSearch = (event) => {
        const { target: { value } } = event
        
        console.log("eeee: ", event)

        if(event.key === 'Enter')
             props.searchByCity(value)
    }

    return(
        <Search>
            <img src="/images/search-icon.png" alt="Ícone de busca" />
            <InputSearch 
                name="search"
                placeholder="Search your City (press Enter)"
                onKeyPress={e => handleSearch(e)}
            />
        </Search>
    )
}
