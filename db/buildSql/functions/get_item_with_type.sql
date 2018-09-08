-- FUNCTION: public.get_item_with_type(bigint)

-- DROP FUNCTION public.get_item_with_type(bigint);

CREATE OR REPLACE FUNCTION public.get_item_with_type(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'id', i.id,
	'name', i."itemName",
	'type', json_build_object(
		'id', i."typeId"
	)
)
FROM adm_core_item i
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_item_with_type(bigint)
    OWNER TO postgres;
