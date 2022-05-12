import { Box } from '@mui/material';

export default function Page({ pageHeader, pageSidebar, children, className = '', fixed = false, widthLimiter = false }) {

    return (<div className={`page ${fixed ? 'tbox-fixed' : ''} ${widthLimiter ? 'width-limiter' : ''} ${className}`}>
        {pageHeader && <div className="page-header">
            {pageHeader}
        </div>}
        <div className="page-content">
            {pageSidebar && <div className="page-sidebar">
                {pageSidebar}
            </div>}
            <div className="page-body">
                {children}
            </div>
        </div>
        <Box display="flex" justifyContent="space-between">
        </Box>
    </div>)

}