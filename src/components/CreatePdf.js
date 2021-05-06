import React, { useContext } from 'react';
import axios from 'axios';
import { Button } from './FormComponents';
import { AuthContext } from '../auth/AuthContext';
import { v4 } from 'uuid';
import { saveAs } from 'file-saver';

export const CreatePdf = ({ data, endpoint, documentPrefix = 'document' }) => {
	const { auth } = useContext(AuthContext);
	const handleCreatePdf = (e) => {
		e.preventDefault();
		const url = `${process.env.REACT_APP_SERVER_URL}api/documents/${endpoint}`;
		const id = v4();
		axios.post(
			url,
			{
				data: data,
				name: auth.user.username,
				reportId: id,
			},
			{ responseType: 'blob' }
		).then((res) => {
			const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
			saveAs(pdfBlob, `${documentPrefix}-${id}.pdf`);
		});
	};
	return <Button onClick={handleCreatePdf}>Create PDF</Button>;
};
