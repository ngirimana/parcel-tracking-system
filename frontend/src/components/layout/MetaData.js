import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
	return (
		<Helmet>
			<title>{`${title} - Courier traking Sytem`}</title>
		</Helmet>
	);
};

export default MetaData;
