import * as http from "http";
import * as https from "https";

interface RequestResult{
    status: boolean,
    data: string | object,
    res,
}

interface RequestOption{
    method? : string,
    dataType? : string,
    data? : object,
    header? : object,
    timeout? : number,
    handleSucess? : Function,
    handleError? : Function,
    handleFinally? : Function,
}

export default class FlagRequest{

    public static async que(url : string) : Promise<RequestResult>;
    public static async que(url : string, option : RequestOption) : Promise<RequestResult>;


    public static async que(url : string, option?) : Promise<RequestResult>{

        let rclass;
        if(url.indexOf("http://") === 0){
            rclass = http;
        }
        else if(url.indexOf("https://") === 0){
            rclass = https;
        }

        return new Promise((resolve)=>{

            const req = rclass.request(url, (res)=>{

                let data : string = "";
                res.on("data", (d)=>{
                    data += d;
                });
    
                res.on("end", ()=>{

                    const result : RequestResult = {
                        status: true,
                        data: data,
                        res: res,
                    };

                    resolve(result);
                });
    
            });
            if(option.data){
                req.write(option.data);
            }
            req.end();
        });

    }


}