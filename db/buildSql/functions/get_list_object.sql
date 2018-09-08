-- FUNCTION: public.get_list_object(bigint, bigint)

-- DROP FUNCTION public.get_list_object(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_list_object(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'list', get_list_items(lst.id, 2935),
	'isInclusive', CASE WHEN cnt."count" IS NULL THEN true ELSE false END,
	'count', CASE WHEN cnt."count" IS NULL THEN 0 ELSE cnt."count" END
)
FROM adm_core_list lst
INNER JOIN adm_link lnk ON lnk."targetId" = lst.id
LEFT OUTER JOIN adm_def_list_select_count cnt ON cnt."listId" = lst.id
WHERE lnk."referenceId" = $1
AND lnk."typeId" = $2
GROUP BY lst.id

$BODY$;

ALTER FUNCTION public.get_list_object(bigint, bigint)
    OWNER TO postgres;
