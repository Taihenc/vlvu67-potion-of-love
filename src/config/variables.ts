const config = {
    gauge_height: 320,
};

export type OptionData = {
    id: Options;
    text: string;
    color: string;
};

export enum Options {
    romance = 'romance',
    patience = 'patience',
    honesty = 'honesty',
    bravery = 'bravery',
    giving = 'giving',
    independence = 'independence',
    sensitivity = 'sensitivity',
    ownership = 'ownership',
}

const options: OptionData[] = [
    {
        id: Options.romance,
        text: 'ความโรแมนติก',
        color: '#fb7582',
    },
    {
        id: Options.patience,
        text: 'ความอดทนและเข้าใจ',
        color: '#a5dcfe',
    },
    {
        id: Options.honesty,
        text: 'ความซื่อสัตย์',
        color: '#fbf1aa',
    },
    {
        id: Options.bravery,
        text: 'ความกล้าแสดงออก',
        color: '#64eb9c',
    },
    {
        id: Options.giving,
        text: 'ความเป็นผู้ให้',
        color: '#b9fec1',
    },
    {
        id: Options.independence,
        text: 'ความเป็นอิสระ',
        color: '#fec195',
    },
    {
        id: Options.sensitivity,
        text: 'ความอ่อนไหว',
        color: '#e5b8ff',
    },
    {
        id: Options.ownership,
        text: 'ความเป็นเจ้าของ',
        color: '#737df9',
    },
];

export type ResultData = {
    id: Results;
    name_th: string;
    name_en: string;
    score: Partial<Record<Options, number>>;
    image: string;
    description: string;
    most_value: string;
};

export enum Results {
    romantic = 'romantic',
    understanding = 'understanding',
    warm_hearted = 'warm_hearted',
    independent = 'independent',
    stable_assertive = 'stable_assertive',
    protective = 'protective',
    sensitive = 'sensitive',
}

const results: ResultData[] = [
    {
        id: Results.romantic,
        name_th: 'คนรักที่มีความโรแมนติก',
        name_en: 'Eternal Romance',
        score: {
            romance: 50,
            honesty: 30,
            bravery: 20,
        },
        image: 'eternal_romance.jpg',
        description:
            'เน้นความโรแมนติกและการแสดงออกทางอารมณ์มากกว่าความสัมพันธ์ที่มีพื้นฐานจากการเป็นหุ้นส่วนทางจิตใจ ความซื่อสัตย์และความกล้าแสดงออกจะอยู่ในระดับที่พอเหมาะเพื่อเสริมความสัมพันธ์ให้มีสีสัน',
        most_value: 'romance',
    },
    {
        id: Results.understanding,
        name_th: 'คนรักที่เข้าใจ',
        name_en: 'Embrace of Love',
        score: {
            patience: 40,
            giving: 30,
            honesty: 30,
        },
        image: 'embrace_of_love.jpg',
        description:
            'เป็นคนที่มีความอดทนสูงและยอมรับความแตกต่างของคู่รัก มีทัศนคติที่ยอมรับข้อบกพร่องของทั้งตัวเองและคู่รัก แต่ยังคงมีความซื่อสัตย์และพร้อมที่จะให้ในการสร้างความสัมพันธ์ที่ยั่งยืน',
        most_value: 'patience',
    },
    {
        id: Results.warm_hearted,
        name_th: 'คนรักที่มีความอบอุ่น',
        name_en: 'Cozy Cuddle',
        score: {
            sensitivity: 50,
            honesty: 30,
            giving: 20,
        },
        image: 'cozy_cuddle.jpg',
        description:
            'บุคคลที่มีความอ่อนไหวสูง มักจะมีความเข้าใจต่อความรู้สึกของคนอื่นและใส่ใจคู่รักอย่างมาก มีความซื่อสัตย์ที่แข็งแกร่งในความสัมพันธ์ แต่บางครั้งอาจทำให้รู้สึกอ่อนไหวเกินไปเมื่อเจอสถานการณ์ที่ยากลำบาก',
        most_value: 'sensitivity',
    },
    {
        id: Results.independent,
        name_th: 'คนรักที่ต้องการอิสระ',
        name_en: 'Love Refreshing',
        score: {
            independence: 60,
            romance: 20,
            ownership: 20,
        },
        image: 'love_refreshing.jpg',
        description:
            'คนที่ให้ความสำคัญกับความอิสระในความสัมพันธ์ ชอบความเป็นตัวของตัวเอง แต่ยังคงมีความโรแมนติกและความต้องการบางอย่างในการแสดงออกถึงความรัก อย่างไรก็ตามอาจมีความรู้สึกเป็นเจ้าของบ้างในบางสถานการณ์',
        most_value: 'independence',
    },
    {
        id: Results.stable_assertive,
        name_th: 'คนรักที่มั่นคงและชัดเจน',
        name_en: 'Intense Amour',
        score: {
            bravery: 40,
            patience: 30,
            ownership: 30,
        },
        image: 'intense_amour.jpg',
        description:
            'คนประเภทนี้จะกล้าแสดงออกอย่างชัดเจนเกี่ยวกับความรู้สึกและความต้องการในความสัมพันธ์ แต่ก็สามารถอดทนและเข้าใจในสถานการณ์ต่างๆ ได้ดี แม้จะมีความเป็นเจ้าของและการควบคุมในบางครั้ง',
        most_value: 'bravery',
    },
    {
        id: Results.protective,
        name_th: 'คนรักที่พร้อมปกป้อง',
        name_en: 'Kandy Kiss',
        score: {
            ownership: 50,
            honesty: 30,
            bravery: 20,
        },
        image: 'kandy_kiss.jpg',
        description:
            'คนนี้อาจจะมีความรู้สึกเป็นเจ้าของคู่รักสูง จึงให้ความสำคัญกับความซื่อสัตย์และความมุ่งมั่นในความสัมพันธ์ ในขณะเดียวกันก็ไม่ลังเลที่จะเปิดเผยความรู้สึกและแสดงออกอย่างชัดเจนเพื่อปกป้องความสัมพันธ์',
        most_value: 'ownership',
    },
    {
        id: Results.sensitive,
        name_th: 'คนรักที่ละเอียดอ่อน',
        name_en: 'Heaven Heart',
        score: {
            sensitivity: 40,
            patience: 40,
            independence: 20,
        },
        image: 'heaven_heart.jpg',
        description:
            'บุคคลนี้มีความอ่อนไหวและสามารถเข้าใจอารมณ์และความรู้สึกของคนอื่นได้ดี สามารถให้ความสำคัญกับคู่รักได้อย่างทุ่มเท แม้จะมีความเป็นอิสระบางประการ พวกเขามักให้ความสำคัญกับการสื่อสารและการเข้าใจในระดับลึก',
        most_value: 'sensitivity',
    },
];

export { options, config, results };
