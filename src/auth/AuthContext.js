import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({ data: { logged: false, data: null } });

	const setAuthData = (data) => {
		setAuth({ data: data });
	};

	return <AuthContext.Provider value={{ auth, setAuthData }}>{children}</AuthContext.Provider>;
};
