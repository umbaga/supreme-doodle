-- FUNCTION: public.get_link_array(bigint, bigint)

-- DROP FUNCTION public.get_link_array(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_link_array(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', arri.id
		, 'name', arri."itemName"
	)
)
FROM adm_core_item i
INNER JOIN adm_link lnk ON lnk."referenceId" = i.id
INNER JOIN adm_core_item arri ON arri.id = lnk."targetId" AND lnk."typeId" = $2
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_link_array(bigint, bigint)
    OWNER TO postgres;
