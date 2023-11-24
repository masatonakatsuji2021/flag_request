import FlagRequest from "../";

(async ()=>{

    const res = await FlagRequest.que("https://raw.githubusercontent.com/masatonakatsuji2021/flag_plugin_storage/main/tsconfig.json");

    console.log(res.data);
})();
