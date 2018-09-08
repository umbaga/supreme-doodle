-- Table: public.adm_def_spell

-- DROP TABLE public.adm_def_spell;

CREATE TABLE public.adm_def_spell
(
    "spellId" bigint NOT NULL,
    "spellLevel" smallint NOT NULL,
    "schoolId" bigint NOT NULL,
    "isRitual" boolean NOT NULL,
    "castingTiimeUnitId" bigint NOT NULL,
    "castingTimeValue" smallint NOT NULL,
    "durationUnitId" bigint NOT NULL,
    "durationValue" smallint NOT NULL,
    "rangeUnitId" bigint NOT NULL,
    "rangeValue" smallint NOT NULL,
    "concentrationUnitId" bigint NOT NULL,
    "concentrationValue" smallint NOT NULL,
    "rangeAreaOfEffectShapeId" bigint NOT NULL,
    "rangeAreaOfEffectUnitId" bigint NOT NULL,
    "rangeAreaOfEffectValue" smallint NOT NULL,
    CONSTRAINT adm_def_spell_pkey PRIMARY KEY ("spellId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_spell
    OWNER to postgres;
    
-- Table: public.adm_def_spell_damage

-- DROP TABLE public.adm_def_spell_damage;

CREATE TABLE public.adm_def_spell_damage
(
    "spellId" bigint NOT NULL,
    "diceId" bigint NOT NULL,
    "damageTypeId" bigint NOT NULL,
    "conditionId" bigint NOT NULL,
    "saveAbilityScoreId" bigint NOT NULL,
    "saveEffectId" bigint NOT NULL,
    "attackTypeId" bigint NOT NULL,
    "areaOfEffectShapeId" bigint NOT NULL,
    "areaOfEffectUnitId" bigint NOT NULL,
    "areaOfEffectValue" smallint NOT NULL,
    "projectileCount" smallint NOT NULL,
    CONSTRAINT adm_def_spell_damage_pkey PRIMARY KEY ("spellId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_spell_damage
    OWNER to postgres;
    
-- Table: public.adm_def_spell_damage_advancement

-- DROP TABLE public.adm_def_spell_damage_advancement;

CREATE TABLE public.adm_def_spell_damage_advancement
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_link'::regclass),
    "spellId" bigint NOT NULL,
    "addDiceId" bigint NOT NULL,
    "addProjectileCount" smallint NOT NULL,
    "advancementTypeId" bigint NOT NULL,
    "advancementValue" bigint NOT NULL,
    CONSTRAINT adm_def_spell_damage_advancement_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_spell_damage_advancement
    OWNER to postgres;
    
-- Table: public.adm_def_spell_damage_supplemental

-- DROP TABLE public.adm_def_spell_damage_supplemental;

CREATE TABLE public.adm_def_spell_damage_supplemental
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_link'::regclass),
    "spellId" bigint NOT NULL,
    "diceId" bigint NOT NULL,
    "typeId" bigint NOT NULL,
    CONSTRAINT adm_def_spell_damage_supplemental_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_spell_damage_supplemental
    OWNER to postgres;
    
