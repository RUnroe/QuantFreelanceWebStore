import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

export default function SearchBar({classList}) {
    const [searchTerm, setSearchTerm] = useState();
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        setTimeout(() => setRedirect(null), 50);
    });
    const goToSearchPage = () => {
        if(searchTerm) setRedirect(`/store/search/${searchTerm}`);
    }
    if(redirect) return (<Redirect push to={redirect} />)
    return (
        <form className={`search-form ${classList}`} onSubmit={evt => goToSearchPage()}>
            <input type="text" placeholder="What service are you looking for?" className="input search" id="searchField" value={searchTerm} onInput={(event) => setSearchTerm(event.target.value)}/>
            <button type="submit"><i className="fas fa-search"></i></button>
        </form>
    );
}