import moment from "moment/moment";

export default class Utils {
    static getHumanDateFormat = (date) => {
        return moment(date).format('MMMM DD, YYYY');
    }
}