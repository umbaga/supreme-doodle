-- Table: public.adm_def_mechanic_bonus

-- DROP TABLE public.adm_def_mechanic_bonus;

CREATE TABLE public.adm_def_mechanic_bonus
(
    "mechanicId" bigint NOT NULL,
    "typeId" bigint NOT NULL,
    value smallint NOT NULL,
    "advancementTypeId" bigint NOT NULL,
    "advancementValue" bigint NOT NULL,
    CONSTRAINT adm_def_mechanic_bonus_pkey PRIMARY KEY ("mechanicId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_mechanic_bonus
    OWNER to postgres;
    
