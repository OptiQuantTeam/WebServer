import { RouteProps } from 'react-router-dom'

export interface IComponent extends RouteProps {
    component : React.ComponentType<any>;
};
