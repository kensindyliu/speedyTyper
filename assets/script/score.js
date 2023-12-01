class Score {
    #name;
    #date;
    #hits;
    #percentage
    #timeUsed
    constructor(name, hits, percentage, timeUsed){
        this.#name = name;
        this.#hits = hits;
        this.#percentage = percentage;

        const now = new Date();
        
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let month = String(now.getMonth() + 1).padStart(2, '0'); 
        let day = String(now.getDate()).padStart(2, '0');
        let year = now.getFullYear();

        this.#date = `${hours}:${minutes} ${month}-${day}-${year}`;
        this.#timeUsed = timeUsed;
    }
    get name(){return this.#name}
    get date(){return this.#date}
    get hits(){return this.#hits}
    get timeUsed(){return this.#timeUsed}
    get percentage(){return `${this.#percentage}%`}
}