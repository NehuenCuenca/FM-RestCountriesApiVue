

const paginateCountries = ( countries = [] ) => {
    
    const countriesPerPage = 8
    let page = 1
    let mapPagesCountries = {}

    while( countries.length > 0 ){
        mapPagesCountries[`${page}`] = [ ...countries.splice(0, countriesPerPage) ]
        page++
    }
    
    return mapPagesCountries || null
}

export default paginateCountries