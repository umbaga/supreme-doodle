-- Table: public.adm_link

-- DROP TABLE public.adm_link;

CREATE TABLE public.adm_link
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_link'::regclass),
    "referenceId" bigint NOT NULL,
    "targetId" bigint NOT NULL,
    "typeId" bigint NOT NULL,
    CONSTRAINT adm_link_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_link
    OWNER to postgres;
    
-- Table: public.adm_link_count

-- DROP TABLE public.adm_link_count;

CREATE TABLE public.adm_link_count
(
    "linkId" bigint NOT NULL,
    count smallint NOT NULL,
    CONSTRAINT adm_link_count_pkey PRIMARY KEY ("linkId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_link_count
    OWNER to postgres;
    
