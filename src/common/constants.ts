export const ROOT_DIR = "data";

const IMAGES_DIR = `${ROOT_DIR}/images`;

export const POLITICIANS_PHOTOS_DIR = `${IMAGES_DIR}/politicians_photos`;
export const EXPERTS_PHOTOS_DIR = `${IMAGES_DIR}/experts_photos`;
export const MEDIA_LOGOS_DIR = `${IMAGES_DIR}/media_logos`;

export enum TYPES {
    TOPIC = "topics",
    EXPERT = "experts",
    CATEGORY = "category",
    WORD_CLOUD = "word_cloud",
    SPHERE = "sphere",
    POLITICIAN = "politicians",
    NETWORK = "network",
    CONNECTION = "connections"
}

export const CATEGORIES_MAP: { [key: string]: string } = {
    "all": "Всі",
    "war": "Війна/Донбас",
    "economics": "Економіка",
    "lifestyle": "Життя/lifestyle",
    "affairs": "Закордонна політика",
    "other": "Інше",
    "quarantine": "Карантин",
    "covid": "Коронавірус",
    "culture": "Культура/шоу-бізнес",
    "incidents": "Інциденти",
    "science": "Наука/технології",
    "weather": "Погода",
    "politics": "Політика",
    "world": "Світ",
    "sport": "Спорт",
    "society": "Суспільство",
}

export enum FILE_EXTENSION {
    CSV = "csv",
    JSON = "json"
}

export enum MOUSE_BUTTON {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}

export enum FILTER_FLAGS {
    NOT_FILTERABLE = 0,
    BY_CATEGORY = 1,
    BY_MEDIA = 2,
    ALL = BY_CATEGORY | BY_MEDIA,
}

// we use this map to detect which filter type can be used for specific data file
export const FILTER_MASK_MAP = {
    [TYPES.TOPIC]: FILTER_FLAGS.BY_MEDIA,
    [TYPES.EXPERT]: FILTER_FLAGS.BY_MEDIA,
    [`${TYPES.EXPERT}_profiles`]: FILTER_FLAGS.BY_CATEGORY,
    [TYPES.CATEGORY]: FILTER_FLAGS.ALL,
    [TYPES.WORD_CLOUD]: FILTER_FLAGS.BY_CATEGORY,
    [TYPES.SPHERE]: FILTER_FLAGS.BY_CATEGORY,
    [TYPES.POLITICIAN]: FILTER_FLAGS.BY_MEDIA,
    [TYPES.NETWORK]: FILTER_FLAGS.NOT_FILTERABLE,
    [TYPES.CONNECTION]: FILTER_FLAGS.NOT_FILTERABLE,
};

// mapper for column that contains category
export const CATEGORY_KEYS = [ "category", "Найбільше коментує" ];

// for filtering media columns
export const NON_MEDIA_KEYS = [ "name", "image_name", "expert_id" ];

// for politician_ type files
export enum Mention {
    POSITIVE = "позитивні",
    NEUTRAL = "нейтральні",
    NEGATIVE = "негативні",
    ALL = "загалом",
}

export const MOCK_DATE = new Date("2021-03");
