import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';


export default function AdminComponent(){

    const dataProvider = jsonServerProvider('http://localhost:8080/api/admin');
    return (
        <div>dfasdfasfasdafsd</div>
    )
}