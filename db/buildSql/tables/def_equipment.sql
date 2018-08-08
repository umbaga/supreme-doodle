-- Table: public.adm_def_equipment

-- DROP TABLE public.adm_def_equipment;

CREATE TABLE public.adm_def_equipment
(
    "equipmentId" bigint NOT NULL,
    cost numeric NOT NULL,
    weight numeric NOT NULL,
    "categoryId" bigint NOT NULL,
    "isMagicItem" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_equipment_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_ammunition

-- DROP TABLE public.adm_def_equipment_ammunition;

CREATE TABLE public.adm_def_equipment_ammunition
(
    "equipmentId" bigint NOT NULL,
    "ammunitionId" bigint NOT NULL,
    CONSTRAINT adm_def_equipment_ammunition_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_ammunition
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_armor

-- DROP TABLE public.adm_def_equipment_armor;

CREATE TABLE public.adm_def_equipment_armor
(
    "equipmentId" bigint NOT NULL,
    "baseArmorClass" smallint NOT NULL,
    "applyDexterityModifier" boolean NOT NULL,
    "maximumDexterityModifier" smallint NOT NULL,
    "isCumulative" boolean NOT NULL,
    "minimumStrength" smallint NOT NULL,
    "stealthDisadvantage" boolean NOT NULL,
    "hasMaximumDexterityModifier" boolean DEFAULT false,
    "hasMinimumStrength" boolean NOT NULL DEFAULT false,
    CONSTRAINT adm_def_equipment_armor_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_armor
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_carry_capacity

-- DROP TABLE public.adm_def_equipment_carry_capacity;

CREATE TABLE public.adm_def_equipment_carry_capacity
(
    "equipmentId" bigint NOT NULL,
    "carryCapacity" smallint NOT NULL,
    CONSTRAINT adm_def_equipment_carry_capacity_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_carry_capacity
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_damage

-- DROP TABLE public.adm_def_equipment_damage;

CREATE TABLE public.adm_def_equipment_damage
(
    "equipmentId" bigint NOT NULL,
    "diceId" bigint NOT NULL,
    "typeId" bigint NOT NULL,
    CONSTRAINT adm_def_equipment_damage_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_damage
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_damage_versatile

-- DROP TABLE public.adm_def_equipment_damage_versatile;

CREATE TABLE public.adm_def_equipment_damage_versatile
(
    "equipmentId" bigint NOT NULL,
    "diceId" bigint NOT NULL,
    CONSTRAINT adm_def_equipment_damage_versatile_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_damage_versatile
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_proficiency

-- DROP TABLE public.adm_def_equipment_proficiency;

CREATE TABLE public.adm_def_equipment_proficiency
(
    "equipmentId" bigint NOT NULL,
    "proficiencyId" bigint NOT NULL,
    CONSTRAINT adm_def_equipment_proficiency_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_proficiency
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_range

-- DROP TABLE public.adm_def_equipment_range;

CREATE TABLE public.adm_def_equipment_range
(
    "equipmentId" bigint NOT NULL,
    "normalRange" smallint NOT NULL,
    "maximumRange" smallint NOT NULL,
    CONSTRAINT adm_def_equipment_range_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_range
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_speed

-- DROP TABLE public.adm_def_equipment_speed;

CREATE TABLE public.adm_def_equipment_speed
(
    "equipmentId" bigint NOT NULL,
    speed numeric NOT NULL,
    CONSTRAINT adm_def_equipment_speed_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_speed
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_unit

-- DROP TABLE public.adm_def_equipment_unit;

CREATE TABLE public.adm_def_equipment_unit
(
    "equipmentId" bigint NOT NULL,
    count smallint NOT NULL,
    unit character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT adm_def_equipment_unit_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_unit
    OWNER to postgres;
    
-- Table: public.adm_def_equipment_weapon

-- DROP TABLE public.adm_def_equipment_weapon;

CREATE TABLE public.adm_def_equipment_weapon
(
    "equipmentId" bigint NOT NULL,
    "classId" bigint NOT NULL,
    CONSTRAINT adm_def_equipment_weapon_pkey PRIMARY KEY ("equipmentId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_equipment_weapon
    OWNER to postgres;
    
