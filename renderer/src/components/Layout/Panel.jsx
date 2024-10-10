import { element, string } from "prop-types"
export function Panel({children, className}) {
    return (<>
        <div className={className}>{children}</div>
    </>)
}

Panel.propTypes = {
    children: element,
    className: string
}