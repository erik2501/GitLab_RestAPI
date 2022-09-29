import React from "react"
import { Routes as ReactRouterRoutes, Route } from "react-router-dom"

import RootLayout from "./RootLayout";
import Login from "../Components/Login";
import CardContainer from "../Components/CardContainer";
import IssuesContainer from "../Components/IssuesContainer";

const RoutesComponent = () => (
	<ReactRouterRoutes>
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Login />} />
			<Route path="commits" element={<CardContainer/>}/>
			<Route path="issues" element={<IssuesContainer/>}/>
		</Route>
	</ReactRouterRoutes>
)

export default RoutesComponent;