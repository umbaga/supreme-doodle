module.exports = {TYPE: {
    ADVANCEMENT_TYPE: {
        AT_LEVEL: 2910,
        BASE: 2927,
        EVERY_X_LEVELS: 2911
    },
    BONUS_TYPE: {
        ABILITY_SCORE: 2913,
        DICE: 2914,
        DIVISOR: 2915,
        MODIFIER: 2916,
        MULTIPLIER: 2917,
        PROFICIENCY_BONUS: 2918,
        SPELLCASTING_ABILITY: 2919
    },
    CHART: {
        DICE: 1062,
        SELECT: 1063,
        STANDARD: 1064
    },
    CHART_RELATIONSHIP: {
        DICE: 1069,
        PICKLIST: 1070,
        PICKLIST_ITEM: 1071
    },
    DATA_TYPE: {
        BOOL: 321,
        DICE: 1067,
        NUMBER: 1065,
        PICKLIST: 1066,
        STRING: 322
    },
    DEFAULT: {
        ADVANCEMENT_TYPE: 2927,
        UNIT: {
            CASTING_TIME: 214,
            LENGTH: 275
        }
    },
    DESCRIPTION: {
        AT_HIGHER_LEVELS: 2891,
        CHART_TEXT: 1072,
        GENERAL: 11,
        MECHANIC_CONDITIONAL: 2908,
        MECHANIC_SPECIAL: 2933,
        REACTION_CASTING_TIME_TEXT: 2892,
        SPECIAL_WEAPON: 84,
        SPELL_COMPONENT_TEXT: 99,
        SUGGESTED_CHARACTERISTICS: 903,
        SUPPLEMENTAL: 2902,
        SUPPLEMENTAL_TITLE: 2940
    },
    EQUIPMENT_CATEGORY: {
        AMMUNITION: 108,
        ARCANE_FOCUS: 109,
        ARMOR: 110,
        ARTISANS_TOOL: 111,
        BARDING: 850,
        DRUIDIC_FOCUS: 112,
        FOOD: 863,
        GAMING_SET: 113,
        GENERAL: 114,
        HOLY_SYMBOL: 115,
        LAND_VEHICLE: 116,
        MOUNT: 117,
        MUSICAL_INSTRUMENT: 118,
        PACK: 119,
        TACK_AND_HARNESS: 120,
        TOOL: 121,
        TRINKET: 887,
        WATER_VEHICLE: 122,
        WEAPON: 123
    },
    ITEM: {
        _TEMPLATE: 0,
        ABBREVIATION: 6,
        ABILITY_SCORE: 59,
        ACTION: 217,
        ACTION_TYPE: 213,
        ADVANCED_SENSE: 202,
        ADVANCEMENT_TYPE: 2909,
        ALIGNMENT: 171,
        ALIGNMENT_ETHICAL: 163,
        ALIGNMENT_MORAL: 167,
        AMMUNITION_TYPE: 436,
        AREA_OF_EFFECT_SHAPE: 2895,
        ATTACK_TYPE: 228,
        BACKGROUND: 902,
        BACKGROUND_VARIANT: 2855,
        BONUS_TYPE: 2912,
        CHART: 1061,
        CHECK: 2920,
        CHECK_TYPE: 248,
        CONDITION: 43,
        COVER: 238,
        DAMAGE_SOURCE: 252,
        DAMAGE_TYPE: 29,
        DATA_TYPE: 319,
        DESCRIPTION_TYPE: 7,
        DIALECT: 324,
        DURATION: 283,
        EQUIPMENT: 435,
        EQUIPMENT_CATEGORY: 107,
        FEATURE: 908,
        LANGUAGE_RARITY: 144,
        LANGUAGE_SCRIPT: 136,
        LEVEL: {
            CHARACTER: -2,
            SPELL: -1
        },
        LIFESTYLE: 878,
        LINK_TYPE: 8,
        MECHANIC_TYPE: 9,
        MISC_MECHANIC_TARGET: 3497,
        MONSTER_TAG: 312,
        MONSTER_TYPE: 148,
        MOVEMENT_TYPE: 207,
        NATURAL_WEAPON_TYPE: 305,
        OTHER_EFFECT: 255,
        PICKLIST: 0,
        PROFICIENCY: 323,
        PROFICIENCY_CATEGORY: 125,
        RANGE: 278,
        RECHARGE_TYPE: 291,
        RESOURCE: 1,
        SAVE_EFFECT: 308,
        SCHOOL_OF_MAGIC: 85,
        SIZE: 100,
        SPELL: 2890,
        SPELLLIST: 5223,
        SPELL_COMPONENT: 94,
        SPELLCASTING_FOCUS: 445,
        STAT: 242,
        SUPPLEMENTAL_PICKLIST: 585,
        TITLE: 10,
        UNIT: {
            COIN: 191,
            LENGTH: 274,
            TIME: 265
        },
        VISION_MODIFIER: 259,
        WEAPON_CLASS: 26,
        WEAPON_PROPERTY: 73
    },
    LINK: {
        ABBREVIATION: 14,
        ASSIGNED_EQUIPMENT: 886,
        CHART: 18,
        CHART_RELATIONSHIP: {
            DICE: 1069,
            PICKLIST: 1070,
            PICKLIST_ITEM: 1071,
            VALUE: {
                BOOL: 1073,
                DICE_RANGE: 1075,
                NUMBER: 1074
            }
        },
        DESCRIPTION: 16,
        DIALECT: 325,
        FEATURE: 909,
        LIST: {
            ADVANCEMENT_LEVEL: 2938,
            CONDITION: 2937,
            DAMAGE_TYPE: 2936,
            GENERAL: 2934,
            ITEM_ASSIGNMENT: 2935,
            PROFICIENCY: 906
        },
        MAP: {
            EQUIPMENT_CATEGORY_TO_PROFICIENCY_CATEGORY: 19,
            EQUIPMENT_CATEGORY_TO_FOCUS_TYPE: 450
        },
        MECHANIC: 21,
        PARENT_CHILD: 124,
        PROFICIENCY: {
            ASSIGNED: 907,
            SELECT: {
                CATEGORY: 905,
                LIST: 904
            }
        },
        RACE: {
            SUBRACE: 20,
            VARIANT: 15
        },
        SPELL: 5224,
        SPELL_COMPONENT: 2939,
        TITLE: 17,
        VARIANT: {
            ASSIGNED_EQUIPMENT: {
                GAIN: 2859,
                LOSE: 2865
            },
            PROFICIENCY: {
                ASSIGNED: {
                    GAIN: 2858,
                    LOSE: 2862
                },
                SELECT: {
                    CATEGORY: {
                        GAIN: 2863,
                        LOSE: 2864
                    },
                    LIST: {
                        GAIN: 2860,
                        LOSE: 2861
                    }
                }
            }
        },
        WEAPON_PROPERTY: 444
    },
    MECHANIC: {
        ADVANTAGE: 12,
        BONUS: {
            ROLL: 2903,
            STAT: 13
        },
        DISADVANTAGE: 2907,
        IMMUNITY: 2906,
        RESISTANCE: 2904,
        SPECIAL_TEXT: 2928,
        VULNERABILITY: 2905
    },
    PROFICIENCY: {
        ARMOR: {
            HEAVY: 432,
            LIGHT: 430,
            MEDIUM: 431,
            SHIELD: 433
        },
        VEHICLE: {
            LAND: 442,
            WATER: 443
        },
        WEAPON: {
            IMPROVISED: 381,
            MARTIAL: 380,
            SIMPLE: 379
        }
    },
    PROFICIENCY_CATEGORY: {
        ARMOR: 126,
        ARTISANS_TOOL: 127,
        GAMING_SET: 128,
        LANGUAGE: 129,
        MUSICAL_INSTRUMENT: 130,
        SAVING_THROW: 131,
        SKILL: 132,
        TOOL: 133,
        VEHICLE: 441,
        WEAPON: 134,
        WEAPON_SPECIFIC: 135
    },
    RESOURCE: {
        DMG: 4,
        MONSTER: 3,
        PHB: 2,
        VOLO: 5
    },
    SIZE: {
        GARGANTUAN: 101,
        HUGE: 102,
        LARGE: 103,
        MEDIUM: 104,
        SMALL: 105,
        TINY: 106
    },
    SPELL_CASTING_TIME: {
        REACTION: 216
    },
    SPELL_COMPONENT: {
        MATERIAL: 95
    },
    SPELL_DURATION: {
        CONCENTRATION: 284
    },
    SPELL_RANGE: {
        SELF: 279
    },
    SPELLCASTING_FOCUS: {
        ARCANE_FOCUS: 446,
        DRUIDIC_FOCUS: 447,
        HOLY_SYMBOL: 448,
        MUSICAL_INSTRUMENT: 449
    },
    SUPPLEMENTAL_PICKLIST: {
        NONE: 586,
        SEE_DESCRIPTION: 2930,
        SELECT_FROM_LIST: 2929
    },
    WEAPON_CLASS: {
        MELEE: 27,
        RANGED: 28
    },
    WEAPON_PROPERTY: {
        AMMUNITION: 74,
        SPECIAL: 80,
        THROWN: 81,
        VERSATILE: 83
    }
}};