import { isEmptyObject } from "../utils/Validate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from "react";
import { usePrevious } from "../utils/hooks";

function LoadingOnFetch({ isFetching, data, children }) {
    const prevFetch = usePrevious(isFetching);

    return (
        ((isFetching && isEmptyObject(data)) || (prevFetch === true && isFetching === true)) ? (
            <div className={"flex-center tw-w-full tw-h-full"}>
                <FontAwesomeIcon spin={true} icon={['fas', 'spinner']} size={"2x"} />
            </div>
        ) : isEmptyObject(data) ? (
            <div className={"flex-center"}>
                <div>
                    {"No Data to Display"}
                </div>
            </div>
        ) : (
                    <Fragment>
                        {children}
                    </Fragment>
                )
    )
}

export default LoadingOnFetch;
