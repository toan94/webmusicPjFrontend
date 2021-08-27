import React from "react";

export default class SearchConfigComponent extends React.Component {

    constructor(props) {
        super(props);

        this.pageSizes = [3, 6, 9];
    }
    render() {

        return (
            <>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search By Name"
                            value={this.props.searchTitle}
                            onChange={this.props.onChangeSearchTitle}
                        />
                        <div className="input-group-append ps-2">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.props.retrieveList}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {"Items per Page: "}
                <select onChange={this.props.handlePageSizeChange} value={this.props.pageSize}>
                    {this.pageSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </>


        );
    }
};