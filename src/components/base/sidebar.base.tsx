import { FC, PropsWithChildren } from 'react';

interface SidebarProps {
    classList: string;
}

export const SidebarView: FC<PropsWithChildren<SidebarProps>> = props => {
    return (
    <div className={ props.classList }>
        { props.children }
    </div>
    );
}

export const ExtraSidebarView: FC<PropsWithChildren<SidebarProps>> = props => {
    return (
    <div className={ props.classList }>
        { props.children }
    </div>
    );
}