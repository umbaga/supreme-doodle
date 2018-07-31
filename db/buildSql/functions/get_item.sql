-- FUNCTION: public.get_item(bigint)

-- DROP FUNCTION public.get_item(bigint);

CREATE OR REPLACE FUNCTION public.get_item(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'id', i.id,
	'name', i."itemName"
)
FROM adm_core_item i
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_item(bigint)
    OWNER TO postgres;
