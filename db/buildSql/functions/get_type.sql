-- FUNCTION: public.get_type(bigint)

-- DROP FUNCTION public.get_type(bigint);

CREATE OR REPLACE FUNCTION public.get_type(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'id', t.id,
	'name', t."typeName"
)
FROM adm_core_type t
WHERE t.id = $1

$BODY$;

ALTER FUNCTION public.get_type(bigint)
    OWNER TO postgres;
