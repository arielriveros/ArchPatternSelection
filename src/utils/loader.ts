export class Loader
{
    public constructor() {}

    public static loadImage(path: string): Promise<HTMLImageElement>
    {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.onerror = (error) => {
                console.error("Error loading image file")
                reject(error);
            }
            img.src = path; 
        });
    }; 

    public static loadText(path: string): string | undefined
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", path, false);
        xhr.send(null);

        if (xhr.status == 200) {
            return xhr.responseText
        }
        else {
            console.error("Error loading text file");
            return;
        }
    }; 

    public static loadJSON(path: string): Promise<any>{
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", path, false);
            xhr.send(null);

            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                console.error("Error loading json file");
                reject();
            }
        });
    }
}