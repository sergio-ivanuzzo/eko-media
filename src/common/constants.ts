export const ROOT_DIR = "data";
export const MAP_FILE = `${ROOT_DIR}/month_to_5categories.json`;

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

export enum CATEGORIES {
    WAR = "war",
    ECONOMICS = "economics",
    LIFESTYLE = "lifestyle",
    AFFAIRS = "affairs",
    OTHER = "other",
    QUARANTINE = "quarantine",
    COVID = "covid",
    CULTURE = "culture",
    INCIDENTS = "incidents",
    SCIENCE = "science",
    WEATHER = "weather",
    POLITICS = "politics",
    WORLD = "world",
    SPORT = "sport",
    SOCIETY = "society"
}

export enum FILE_EXTENSION {
    CSV = "csv",
    JSON = "json"
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

export const FILTER_BY_CATEGORY_INDEXES = [ "category", "Найбільше коментує" ];
