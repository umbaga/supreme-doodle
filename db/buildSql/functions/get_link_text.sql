-- FUNCTION: public.get_link_text(bigint, bigint)

-- DROP FUNCTION public.get_link_text(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_link_text(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS character varying
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT abbr."itemName"
FROM adm_core_item i
LEFT OUTER JOIN adm_link abbrlnk ON abbrlnk."referenceId" = i.id AND abbrlnk."typeId" = $2
LEFT OUTER JOIN adm_core_item abbr ON abbr.id = abbrlnk."targetId"
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_link_text(bigint, bigint)
    OWNER TO postgres;
