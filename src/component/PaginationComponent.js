// import {Pagination} from "react-bootstrap";
import React from 'react'
import '../css/paginationStyle.scss'
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
            // <Pagination size={'sm'} className={"d-flex justify-content-center mt-5 "}>
            //     <Pagination.First/>
            //     <Pagination.Prev />
            //     <Pagination.Item>{currentPage}</Pagination.Item>
            //     <Pagination.Ellipsis disabled/>
            //
            //     <Pagination.Item>{currentPage+1}</Pagination.Item>
            //     <Pagination.Item>{currentPage+2}</Pagination.Item>
            //     <Pagination.Item active>{currentPage+3}</Pagination.Item>
            //     <Pagination.Ellipsis disabled/>
            //
            //     <Pagination.Item>{currentPage+9}</Pagination.Item>
            //     <Pagination.Item disabled>{currentPage+10}</Pagination.Item>
            //
            //     <Pagination.Ellipsis disabled/>
            //     <Pagination.Item>{20}</Pagination.Item>
            //     <Pagination.Next />
            //     <Pagination.Last />
            // </Pagination>
        )
    }
}