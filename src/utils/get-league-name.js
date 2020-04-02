export const getLeagueName = id => {        
    switch(id) {
        case 2021:
            return "England - Premier League"
        case 2016:
            return "England - Championship"
        case 2014:
            return "Spain - La Liga"
        case 2019:
            return "Italy - Serie A"
        case 2002:
            return "Germany - Bundesliga"
        case 2015:
            return "France - Ligue 1"
        case 2003:
            return "Netherlands - Eredivisie"
        case 2017:
            return "Portugal – Premeira Liga"
        case 2013:
            return "Brazil - Serie A"                
        default:
            return "Not Found"
    }
}