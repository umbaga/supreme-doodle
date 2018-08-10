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
	'id', i.id,
	'name', i."itemName",
	'decription', dsc."description"
)
FROM adm_core_item i
INNER JOIN adm_link lnk ON lnk."referenceId" = i.id
AND lnk."typeId" = 16
INNER JOIN adm_core_description dsc ON dsc.id = lnk."targetId"
INNER JOIN adm_link ftlnk ON ftlnk."targetId" = i.id
AND ftlnk."typeId" = 909
WHERE ftlnk."referenceId" = $1

$BODY$;

ALTER FUNCTION public.get_feature(bigint)
    OWNER TO postgres;
