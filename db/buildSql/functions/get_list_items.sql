-- FUNCTION: public.get_list_items(bigint, bigint)

-- DROP FUNCTION public.get_list_items(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_list_items(
	"listId" bigint,
	"listLinkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', i.id,
		'name', i."itemName"
	)
) 
FROM adm_core_list lst
INNER JOIN adm_link lnk ON lnk."referenceId" = lst.id AND lnk."typeId" = $2
LEFT OUTER JOIN adm_core_item i ON i.id = lnk."targetId"
WHERE lst.id = $1

$BODY$;

ALTER FUNCTION public.get_list_items(bigint, bigint)
    OWNER TO postgres;
