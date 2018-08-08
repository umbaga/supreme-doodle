-- Table: public.adm_def_picklist_item_ability_score

-- DROP TABLE public.adm_def_picklist_item_ability_score;

CREATE TABLE public.adm_def_picklist_item_ability_score
(
    "itemId" bigint NOT NULL,
    "isPrimary" boolean NOT NULL DEFAULT false,
    "isPhysical" boolean NOT NULL DEFAULT false,
    "isMental" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_picklist_item_ability_score_pkey PRIMARY KEY ("itemId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_picklist_item_ability_score
    OWNER to postgres;
    
-- Table: public.adm_def_picklist_item_damage_type

-- DROP TABLE public.adm_def_picklist_item_damage_type;

CREATE TABLE public.adm_def_picklist_item_damage_type
(
    "itemId" bigint NOT NULL,
    "isWeapon" boolean NOT NULL DEFAULT false,
    "isEnergy" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_picklist_item_damage_type_pkey PRIMARY KEY ("itemId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_picklist_item_damage_type
    OWNER to postgres;
    
-- Table: public.adm_def_picklist_item_order

-- DROP TABLE public.adm_def_picklist_item_order;

CREATE TABLE public.adm_def_picklist_item_order
(
    "itemId" bigint NOT NULL,
    "orderIndex" smallint NOT NULL,
    CONSTRAINT adm_def_picklist_item_order_pkey PRIMARY KEY ("itemId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_picklist_item_order
    OWNER to postgres;
    
-- Table: public.adm_def_picklist_item_proficiency_category

-- DROP TABLE public.adm_def_picklist_item_proficiency_category;

CREATE TABLE public.adm_def_picklist_item_proficiency_category
(
    "itemId" bigint NOT NULL,
    "requireLanguage" boolean NOT NULL DEFAULT false,
    "requireAbilityScore" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_picklist_item_proficiency_category_pkey PRIMARY KEY ("itemId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_picklist_item_proficiency_category
    OWNER to postgres;
    
-- Table: public.adm_def_picklist_item_spell_component

-- DROP TABLE public.adm_def_picklist_item_spell_component;

CREATE TABLE public.adm_def_picklist_item_spell_component
(
    "itemId" bigint NOT NULL,
    "requireFlavorText" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_picklist_item_spell_component_pkey PRIMARY KEY ("itemId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_picklist_item_spell_component
    OWNER to postgres;
    
-- Table: public.adm_def_picklist_item_weapon_property

-- DROP TABLE public.adm_def_picklist_item_weapon_property;

CREATE TABLE public.adm_def_picklist_item_weapon_property
(
    "itemId" bigint NOT NULL,
    "requireRange" boolean NOT NULL DEFAULT false,
    "requireAmmunition" boolean NOT NULL DEFAULT false,
    "requireVersatileDamage" boolean NOT NULL DEFAULT false,
    "requireSpecialDescription" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_picklist_item_weapon_property_pkey PRIMARY KEY ("itemId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_picklist_item_weapon_property
    OWNER to postgres;
    
