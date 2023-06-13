export default {

    'getRoutes': async () => {

        const uid = localStorage.getItem('userid');
        const ch = localStorage.getItem('token');

        let result = await fetch(`api/routes/?uid=${uid}&ch=${ch}`);

        let resultJson = await result.json();
        return resultJson;
    }
};