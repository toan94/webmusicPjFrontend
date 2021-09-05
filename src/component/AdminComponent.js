import * as React from "react";
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';


export default function AdminComponent(){

    const dataProvider = jsonServerProvider('http://localhost:3000/admin');
    return (
        <Admin dataProvider={dataProvider} />
    )
}