import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Resources/Styles/Components/NewsComponent.css";
const NewsComponent = ({ newsArticles }) => {
    return (
        <>
            {newsArticles.map((item, index) => {

                const website = item.readMoreUrl

                // .split("//")[1].split(".")
                
                

                return (
                    <div className="articles">
                        <a href={item.readMoreUrl}>
                            <div key={index}>
                                <img src={item.imageUrl} />
                                {/* <h3>{website[1]}: {item.title}</h3> */}
                                {website}
                                {/* <h3 id="">  {website[0] == "www" ? website[1].toUpperCase() : website[0].toUpperCase()} : {item.title}</h3> */}
                            </div>
                        </a>
                    </div>
                );
            })}
        </>
    );
};

export default NewsComponent;
