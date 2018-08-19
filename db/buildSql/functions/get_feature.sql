-- FUNCTION: public.get_feature(bigint)

-- DROP FUNCTION public.get_feature(bigint);

CREATE OR REPLACE FUNCTION public.get_feature(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT json_build_object(
	'id', CASE WHEN ftlnk."targetId" IS NULL THEN 0 ELSE i.id END,
	'name', CASE WHEN ftlnk."targetId" IS NULL THEN '' ELSE i."itemName" END,
	'description', CASE WHEN ftlnk."targetId" IS NULL THEN '' ELSE get_description(i.id, 11) END
)
FROM adm_core_item i
INNER JOIN adm_link lnk ON lnk."referenceId" = i.id AND lnk."typeId" = 16
INNER JOIN adm_link ftlnk ON ftlnk."targetId" = i.id AND ftlnk."typeId" = 909
WHERE ftlnk."referenceId" = $1

$BODY$;

ALTER FUNCTION public.get_feature(bigint)
    OWNER TO postgres;
