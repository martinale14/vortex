import { GET_ALL_COMPANIES, GET_ALL_PROJECTS, GET_ALL_SPRINTS } from '../../utils/url_utils';
import axios from '../../utils/axios_config'

class TableService{
    static async fetchCompanies(){
        let response: any;
        await axios.get(GET_ALL_COMPANIES)
            .then(res => { response = res.data.companies })
        return response;
    }

    static async fetchProjects(id: String){
        let response: any;
        await axios.get(GET_ALL_PROJECTS + id)
            .then(res => { response = res.data.projects })
        return response;
    }

    static async fetchSprints(id: String){
        let response: any;
        await axios.get(GET_ALL_SPRINTS + id)
            .then(res => { 
                console.log(res.data);
                
                response = res.data.sprints })
        return response;
    }
}

export default TableService