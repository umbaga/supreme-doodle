-- Table: public.adm_def_background

-- DROP TABLE public.adm_def_background;

CREATE TABLE public.adm_def_background
(
    "backgroundId" bigint NOT NULL,
    "startingGold" numeric NOT NULL,
    CONSTRAINT adm_def_background_pkey PRIMARY KEY ("backgroundId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_def_background
    OWNER to postgres;
    
