// import {Pagination} from "react-bootstrap";
import React from 'react'
import {Pagination} from "@material-ui/lab";
import artistService from "../services/artistService";

export default class PaginationComponent extends React.Component {



    render() {

        return (
            <Pagination
                className="my-3 d-flex justify-content-center mt-5"
                count={this.props.count}
                page={this.props.page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={this.props.handlePageChange}
            />

        )
    }
}