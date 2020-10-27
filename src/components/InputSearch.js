import React from 'react';
import styled from 'styled-components';

const InputText = styled.input`
    border: none;
    width: 100%;
`

export const InputSearch = (props) => {
    return (
        <InputText {...props} />
    )
}