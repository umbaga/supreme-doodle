-- Table: public.adm_def_proficiency

-- DROP TABLE public.adm_def_proficiency;

CREATE TABLE public.adm_def_proficiency
(
    "proficiencyId" bigint NOT NULL,
    "categoryId" bigint NOT NULL,
    CONSTRAINT adm_def_proficiency_pkey PRIMARY KEY ("proficiencyId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_proficiency
    OWNER to postgres;
    
-- Table: public.adm_def_proficiency_ability_score

-- DROP TABLE public.adm_def_proficiency_ability_score;

CREATE TABLE public.adm_def_proficiency_ability_score
(
    "proficiencyId" bigint NOT NULL,
    "abilityScoreId" bigint NOT NULL,
    CONSTRAINT adm_def_proficiency_ability_score_pkey PRIMARY KEY ("proficiencyId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_proficiency_ability_score
    OWNER to postgres;
    
-- Table: public.adm_def_proficiency_ability_score

-- DROP TABLE public.adm_def_proficiency_ability_score;

CREATE TABLE public.adm_def_proficiency_ability_score
(
    "proficiencyId" bigint NOT NULL,
    "abilityScoreId" bigint NOT NULL,
    CONSTRAINT adm_def_proficiency_ability_score_pkey PRIMARY KEY ("proficiencyId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_proficiency_ability_score
    OWNER to postgres;
    
