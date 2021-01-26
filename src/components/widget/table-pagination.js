import { useState, useEffect, useRef } from 'react';
import Skeleton from "react-loading-skeleton";
import tableStyles from './table.pagination.module.scss';
import classnames from 'classnames';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { displayDate, displayBool, displayDateTime, displayMoney, displayQty, displayPercent } from '../../utils/Formater';
import { toNumberOnly } from "../../utils/text";
import paginationStyles from "../css/Pagination.module.scss";


const pagingComposer = (onEvent, uiPageSelect, isFetching) => {
    const pagingPage = {};
    const [containerHeight, setContainerHeight] = useState("");
    const tableRef = useRef(null);
    pagingPage.Table = ({ className, children }) => {
        className = className ? className : classnames(tableStyles.table);
        return (
            <table className={className} ref={tableRef}>
                {children}
            </table>
        )
    };

    pagingPage.ThField = ({ field, children, ...props }) => {
        // if (uiPageSelect.sortable.includes(field)) {
        //     const sortValue = uiPageSelect.sort.find((sort) => sort.field === field);
        //     const direction = sortValue === undefined ? ["fas", "sort"] : (sortValue.direction === "asc" ? ["fas", "sort-up"] : ["fas", "sort-down"]);
        //     const _onClick = () => {
        //         const nextDirection = sortValue === undefined ? 'asc' : (sortValue.direction === "asc" ? 'desc' : null);
        //         onEvent(null, null, { field, direction: nextDirection });
        //     };
        //     return (
        //         <th {...props}>
        //             <div className={"flex items-center cursor-pointer h-10"} onClick={_onClick}>
        //                 <div className={"w-full"}>
        //                     {children}
        //                 </div>
        //                 <div className={"pl-4"}>
        //                     <FontAwesomeIcon icon={direction} size={"sm"} />
        //                 </div>
        //             </div>
        //         </th>
        //     )
        // } else {
        return pagingPage.Th({ children, ...props })
        // }
    };

    pagingPage.ThField.propTypes = {
        field: PropTypes.string.isRequired
    };

    pagingPage.Th = ({ children, ...props }) => {
        return (
            <th {...props}>
                <div className={"flex items-center h-8"}>
                    <div className={"w-full"}>
                        {children}
                    </div>
                </div>
            </th>
        )
    };

    pagingPage.Pagination = () => {
        const { page, totalPage, totalData, firstItem, lastItem } = uiPageSelect.paging.toObject();
        const [inputPage, setInputPage] = useState(page);

        const handleGoToPage = (e) => {
            // User pressed the enter key
            if (e.keyCode === 13) {
                const goToPage = e.currentTarget.value === '' ? page : e.currentTarget.value;
                setInputPage(goToPage);
                const vPage = isNaN(e.currentTarget.value) ? 1 : parseInt(e.currentTarget.value);
                onEvent(vPage);
            }
        };

        const handlePagination = (value) => {
            if (value != page) {
                const goToPage = value === '' ? page : value;
                setInputPage(goToPage);
                const vPage = isNaN(goToPage) ? 1 : parseInt(goToPage);
                onEvent(vPage);
            }
        };
        const _handleOnChange = (e) => {
            setInputPage(toNumberOnly(e.target.value));
        };
        useEffect(() => {
            setInputPage(page);
        }, [page]);

        return (
            <div className={classnames(paginationStyles.paginateContainer, "border-t")}>
                <div className={""}>
                    <p className={classnames(paginationStyles.pagingInfo)}>
                        {firstItem} {"to"} {lastItem} {"of"} {totalData} {"results"}
                    </p>
                </div>
                <div className={"flex align-center"}>
                    <nav className={classnames(paginationStyles.nav)}>
                        <button onClick={() => handlePagination(1)} disabled={page === 1}
                            className={classnames(paginationStyles.navButton, (page === 1 ? paginationStyles.disabled : ""))}
                            aria-label="Previous">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path fill="currentColor" d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
                            </svg>
                        </button>
                        <button onClick={() => handlePagination(page - 1)} disabled={page === 1}
                            className={classnames(paginationStyles.navButton, (page === 1 ? paginationStyles.disabled : ""))}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                        </button>
                        <span className={classnames(paginationStyles.navInputWrapper)}>
                            <input onBlur={(e) => handlePagination(e.target.value)}
                                onKeyDown={handleGoToPage}
                                onChange={_handleOnChange}
                                className={classnames(paginationStyles.navInputGoToPage)}
                                value={inputPage}
                                readOnly={(totalPage < 1)}
                                style={{ width: "50px" }} />
                        </span>
                        <button onClick={() => handlePagination(page + 1)} disabled={page === totalPage || totalPage < 1}
                            className={classnames(paginationStyles.navButton, ((page === totalPage || totalPage < 1) ? paginationStyles.disabled : ""))}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </button>
                        <button onClick={() => handlePagination(totalPage)} disabled={page === totalPage || totalPage < 1}
                            className={classnames(paginationStyles.navButton, ((page === totalPage || totalPage < 1) ? paginationStyles.disabled : ""))}
                            aria-label="Next">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path fill="currentColor" d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        );
    };

    pagingPage.LabelData = ({ isDate, isBool, isDateTime, isMoneyWithSymbol, isMoneyNoSymbol, isQty, isPercentWithSymbol, isArr, symbol = "", children, className }) => {
        return isFetching ? (
            <Skeleton />
        ) : isDate ? (
            <span className={className}>{displayDate(children)}</span>
        ) : isBool ? (
            <span className={className}>{displayBool(children)}</span>
        ) : isDateTime ? (
            <span className={className}>{displayDateTime(children)}</span>
        ) : isMoneyWithSymbol ? (
            <span className={classnames("span-right", className)}>{displayMoney(children, true)}</span>
        ) : isMoneyNoSymbol ? (
            <span className={classnames("span-right", className)}>{displayMoney(children, false)}</span>
        ) : isQty ? (
            <span className={classnames("span-right", className)}>{displayQty(children, symbol)}</span>
        ) : isArr ? (
            <div className={className} style={{ width: "300px", whiteSpace: "normal" }}>{children.toArray().join(', ')}</div>
        ) : isPercentWithSymbol ? (
            <span className={classnames("span-right", className)}>{displayPercent(children, true)}</span>
        ) : (
                                                <span className={className}>{children}</span>
                                            );
    };

    pagingPage.LabelNoData = ({ colSpan }) => (<tr><td className={"text-center"} colSpan={colSpan}>No Data</td></tr>)

    pagingPage.handleBeforeDrag = () => {
        const containerHeight = tableRef ? tableRef.current.clientHeight : 0;
        setContainerHeight(containerHeight + "px")
    }

    pagingPage.tableHeight = () => {
        return containerHeight === "" ? "100%" : containerHeight;
    }

    return pagingPage;

}

pagingComposer.currAcct = {
    currency: "",
    currencySymbol: "",
    decimalPlaces: 0,
    decimalSeparator: ".",
    delimiter: ',',
    disableRoundNotCash: true,
    priceChangeNoPin: 0,
    priceChangeWithPin: 0,
    qtyDecimalPlaces: 0,
    roundingCash: "0",
    roundingDirection: "",
    symbolPosition: "",
    taxEnabled: false,
    taxIncludeInPrice: false,
    taxprofileId: "0"
}

export { pagingComposer };