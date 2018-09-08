-- Table: public.adm_core_item

-- DROP TABLE public.adm_core_item;

CREATE TABLE public.adm_core_item
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_core'::regclass),
    "itemName" character varying COLLATE pg_catalog."default" NOT NULL,
    "typeId" bigint NOT NULL,
    "resourceId" bigint NOT NULL DEFAULT 0,
    CONSTRAINT adm_core_item_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_core_item
    OWNER to postgres;
    
-- Table: public.adm_core_type

-- DROP TABLE public.adm_core_type;

CREATE TABLE public.adm_core_type
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_core'::regclass),
    "typeName" character varying COLLATE pg_catalog."default" NOT NULL,
    "isPicklist" boolean NOT NULL DEFAULT true,
    "applySupplementalPicklist" boolean DEFAULT false,
    CONSTRAINT adm_core_type_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_core_type
    OWNER to postgres;
    
-- Table: public.adm_core_description

-- DROP TABLE public.adm_core_description;

CREATE TABLE public.adm_core_description
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_core'::regclass),
    description character varying COLLATE pg_catalog."default" NOT NULL,
    "typeId" bigint NOT NULL,
    index smallint NOT NULL DEFAULT 0,
    CONSTRAINT adm_core_description_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_core_description
    OWNER to postgres;
    
-- Table: public.adm_core_dice

-- DROP TABLE public.adm_core_dice;

CREATE TABLE public.adm_core_dice
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_core'::regclass),
    "dieCount" smallint NOT NULL,
    "dieType" smallint NOT NULL,
    modifier smallint NOT NULL DEFAULT 0,
    multiplier smallint NOT NULL DEFAULT 1,
    divisor smallint NOT NULL DEFAULT 1,
    CONSTRAINT adm_core_dice_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_core_dice
    OWNER to postgres;
    
-- Table: public.adm_core_chart

-- DROP TABLE public.adm_core_chart;

CREATE TABLE public.adm_core_chart
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_core'::regclass),
    index bigint NOT NULL,
    CONSTRAINT adm_core_chart_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_core_chart
    OWNER to postgres;
    
-- Table: public.adm_core_mechanic

-- DROP TABLE public.adm_core_mechanic;

CREATE TABLE public.adm_core_mechanic
(
    id bigint NOT NULL DEFAULT nextval('adm_seq_core'::regclass),
    "typeId" bigint NOT NULL,
    "targetId" bigint NOT NULL,
    CONSTRAINT adm_core_mechanic_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adm_core_mechanic
    OWNER to postgres;
    
