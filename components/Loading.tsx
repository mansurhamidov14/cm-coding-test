import * as React from "react";

interface IProps {
    small?: boolean;
}

export const Loading: React.FC<IProps> = ({ small }) => (
    <div style={{ textAlign: 'center'}}>
        <img style={{ width: small ? '200px' : '400px' }} src="/assets/images/loading.gif" />
    </div>
);
