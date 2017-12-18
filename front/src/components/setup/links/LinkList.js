import React from 'react';
import LinkItem from './LinkItem';

const LinkList = ( {links, updateLinks} ) => {
    let linkElements = [];
    links.forEach( (link, i) => {
        linkElements.push(
            <LinkItem
                updateLinks={updateLinks}
                key={i}
                link={link}
                linkId={i}
            />
        )
    })
    return (
        <div className = "link-list">
            {linkElements}
        </div>
    );
}

export default LinkList;
