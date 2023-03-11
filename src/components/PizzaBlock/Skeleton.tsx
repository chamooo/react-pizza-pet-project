import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="-2" y="234" rx="9" ry="9" width="280" height="29" />
        <circle cx="134" cy="113" r="103" />
        <rect x="1" y="291" rx="9" ry="9" width="280" height="67" />
        <rect x="2" y="387" rx="9" ry="9" width="130" height="27" />
        <rect x="147" y="387" rx="9" ry="9" width="134" height="27" />
    </ContentLoader>
);

export default MyLoader;
